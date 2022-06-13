#!/bin/bash

# Script to build the extension zip and install the package
#
# This Script is released under GPL v3 license
# Copyright (C) 2022 eagirrezabal

# Original script by Javad Rahmatzadeh for https://gitlab.gnome.org/jrahmatzadeh/just-perfection/-/blob/main/scripts/build.sh



set -e

mkdir onscreen-keyboard-switcher@eagirrezabal
cp *.* ./onscreen-keyboard-switcher@eagirrezabal

echo "Packing extension ..."
gnome-extensions pack onscreen-keyboard-switcher@eagirrezabal \
	--force \
	--extra-source="extension.js" \
	--extra-source="COPYING" 
echo "Packing done!"

echo "Installing extension ..."
while getopts i flag; do
    case $flag in

        i)  gnome-extensions install --force \
            onscreen-keyboard-switcher@eagirrezabal.shell-extension.zip && \
            echo "Extension onscreen-keyboard-switcher@eagirrezabal is installed. Please restart GNOME Shell." || \
            { echo "ERROR: Could not install extension!"; exit 1; };

        *)  echo "ERROR: Invalid flag!"
            echo "Use '-i' to install the extension to your system."
            echo "To just build it, run the script without any flag."
            exit 1;;
    esac
done

echo "Removing extension packaging data (folder & zip)..."
rm -rf onscreen-keyboard-switcher@eagirrezabal
rm -rf onscreen-keyboard-switcher@eagirrezabal.shell-extension.zip


