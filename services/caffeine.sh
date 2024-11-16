#!/usr/bin/env bash

# Hypridle toggle
function toggle {
	if pgrep "hypridle" > /dev/null
	then
		pkill hypridle
		notify-send --hint=string:x-canonical-private-synchronous:idleinhibit -u normal "   Hypridle Inactive"
    else
        
        hyprctl dispatch exec hypridle
        notify-send --hint=string:x-canonical-private-synchronous:idleinhibit -u normal "  Hypridle Active"
    fi
}

case $1 in
	toggle)
		toggle
		;;
	*)
		if pgrep "hypridle" > /dev/null
		then
			icon=""
		else
			icon=""
		fi
		printf "%s" "$icon "
		;;
esac