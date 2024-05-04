#!/bin/bash

echo "[!] Please make sure you have committed all the changes before bumping the version!"
echo "Current version: $(grep -E -o "[0-9](.*)" .version)"
echo "Select which part (major.minor.patch) of the version to bump:"
echo "1) Major"
echo "2) Minor"
echo "3) Patch"
read select

# awk -F<分割符號>
if [ "$select" == "1" ]; then
    new_version=$(echo $(grep -E -o "[0-9](.*)" .version) | awk -F. '{print $1+1".0.0"}')
elif [ "$select" == "2" ]; then
    new_version=$(echo $(grep -E -o "[0-9](.*)" .version) | awk -F. '{print $1"."$2+1".0"}')
elif [ "$select" == "3" ]; then
    new_version=$(echo $(grep -E -o "[0-9](.*)" .version) | awk -F. '{print $1"."$2"."$3+1}')
else
    echo "Invalid option"
    exit 1
fi

echo "New version: $new_version"
echo "Verify the changes and push to the remote repository? (y/n)"
read verify
if [ "$verify" != "y" ]; then
    echo "Abort"
    exit 1
fi

# Update version in .version
echo "HOHOJIA_VERSION=$new_version" > .version

# commit the change
git add .version
git commit -m "Bump version to v$new_version"
# add tag
git tag -a v$new_version -m "Bump version to v$new_version"
push the commit and tag
git push
git push origin v$new_version