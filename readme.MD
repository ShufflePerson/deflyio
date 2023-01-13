# Packet & Logic BOT for Defly.io

The BOT is meant to be a automatic player for Defly.IO that utilizes direct packets instead of just running the game in a webdriver

The whole source code is over 1600 line of code and might have some poopy code in it. I will try to clean it up as much as possible.

## Features

- [x] Ban evasion measures
- [x] Coin Farm (1v1 mode)
- [x] Visualizer
- [x] Proxy Mode

## In Development

The Logic part is still in development. It has no use yet, but the source code can very well be used as a base for implementing your own logic.

## Using as a base

This does not support all types of packets. Take a look in the [Packets.ts](src\enums\Packets.ts) file to see the enum of all packets.

## Visualizer

Visualizer is a Visualizer built to visualize the game state & the logic predictions / decisions.
![Visualizer](https://i.imgur.com/FSgNLV2.png)

## Information about the Packets

Check the [notes.MD](notes.MD) file for information about the packets.

## Modes

The bot works in all gamemodes, including `1v1` game mode.

## 1v1

In the 1v1 game mode, the bot joins with two accounts. One guest, and the selected main account. The main account kills the guest account and it instantly restarts

This farms a ton of coins very quick.

## Anti-Ban measures

The 1v1 mode automatically leaves the server and starts searching for a new one when a non-whitelisted name joins.

## Proxy Mode

Proxy mode can connect your browser instead, so everything is visualized in your browser. This is useful for debugging.

This also allows you to very easily dump packets and see what is going on.


## This is not all
As I am writing this months after I last worked on this Project, I most likely forgot some a lot of stuff to write in here. 

The source code is fairly big but fairly decently organized so feel free to take a look yourself. 

## Setup
This Project at the current state is only useful for expanding, so unless you are a developer, you probably don't want to use this.

To install on windows, download the source code. Then simply run `run.bat` 



## Contact
You can contact me on my discord: `Shuffle#4696` 