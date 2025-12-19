#!/bin/sh

for file in /usr/share/nginx/html/assets/*.js;
do
  if [ -f "$file" ]; then
    sed -i "s|http://localhost/auth|${VITE_KC_URL}|g" "$file"
  fi
done

exec "$@"