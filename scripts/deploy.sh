#!/bin/sh
# Builds the site with the real case studies and mirrors dist/ to the host.
# Host settings live in .env in the content repo, never in this one.
set -eu

CONTENT_DIR=${CONTENT_DIR:-../nikolaidot.com-content}
CONFIG="$CONTENT_DIR/.env"

[ -f "$CONFIG" ] || { echo "Missing $CONFIG (copy it from .env.example)" >&2; exit 1; }
command -v lftp >/dev/null || { echo "lftp is not installed (brew install lftp)" >&2; exit 1; }

# Sets DEPLOY_URL, DEPLOY_PATH and SITE_URL.
. "$CONFIG"
: "${DEPLOY_URL:?not set in $CONFIG}" "${DEPLOY_PATH:?not set in $CONFIG}" "${SITE_URL:?not set in $CONFIG}"

case $SITE_URL in
  https://*) ;;
  *) echo "SITE_URL must start with https:// ($SITE_URL)" >&2; exit 1 ;;
esac

CONTENT_DIR=$CONTENT_DIR SITE_URL=$SITE_URL pnpm astro build

# Plain FTP is refused: FTP must use TLS. SFTP ignores these.
SETTINGS="set ftp:ssl-force true; set ftp:ssl-protect-data true; set ssl:verify-certificate true"
MIRROR="mirror --reverse --delete --no-perms --verbose"
PATHS="dist/ \"$DEPLOY_PATH\""

lftp -e "$SETTINGS; $MIRROR --dry-run $PATHS; bye" "$DEPLOY_URL"

printf 'Apply these changes to %s? [y/N] ' "$DEPLOY_PATH"
read -r answer
[ "$answer" = y ] || exit 0

lftp -e "$SETTINGS; $MIRROR $PATHS; bye" "$DEPLOY_URL"
