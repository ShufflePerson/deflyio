




let grid = [];
var socket = io();
var colors = {};
var data = {}
colors["1"] = "#000000";

socket.on('message', function (data) {
    alert(data);
});



socket.on("game_memory", ((_data) => {
    data = JSON.parse(_data);

    let local_player = data.Players[data.LocalID];
    

    clear();
    update_usernames();
    draw_grid();
    !local_player ? null : update_cords(local_player.x, local_player.y, data);
    draw_bullets();
    draw_players();
    draw_towers(data.Dots | []);
}))

socket.on("walk_path", ((data) => {
    data = JSON.parse(data);
    for (let i = 0; i < data.length - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(data[i][0], data[i][1]);
        ctx.lineTo(data[i + 1][0], data[i + 1][1]);
        ctx.stroke();
    }

}))

socket.on("grid", (data) => {
    grid = JSON.parse(data);
    if (grid.length == undefined) return;
    draw_grid();
})

let canvas = document.getElementById("canvas");
let ctx;


function clear() {
    ctx.fillStyle = "#191919";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
}

function draw_rect(x, y, width, height, color = "#000000") {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.strokeStyle = "#FFFFFF";
    ctx.rect(x, y, width, height);
    ctx.fill();
    ctx.stroke();
}


function draw_grid() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let elm = grid[i][j];
            if (!colors[elm.owner]) {
                colors[elm.owner] = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);;
            }
            let color = colors[elm.owner];
            if (!elm.walkable && elm.owner != data.LocalID) {
                color = "#FF0000";
            } else if (!elm.walkable && elm.owner == data.LocalID) {
                color = "#A020F0";
            } else {
                color = "#FFFF00";
            }

            draw_rect(elm.position.x, elm.position.y, color);

        }
    }
}


function draw_towers() {
    let towers = data.Towers;
    for (let i = 0; i < towers.length; i++) {
        draw_rect(towers[i][0], towers[i][1], 10, 10, "#000000");
    }

    for (let i = 0; i < towers.length; i++) {
        for (let j = i + 1; j < towers.length; j++) {
            if (Math.abs(towers[i][0] - towers[j][0]) < 30 && Math.abs(towers[i][1] - towers[j][1]) < 30) {
                ctx.beginPath();
                ctx.moveTo(towers[i][0], towers[i][1]);
                ctx.lineTo(towers[j][0], towers[j][1]);
                ctx.stroke();
            }
        }
    }

}

function update_usernames() {
    let usernames = data.Usernames;
    let ids = Object.keys(usernames);
    for (var i = 0; i < ids.length; i++) {
        let username = usernames[ids[i]];
        let username_elm = document.getElementById(username);
        if (!username_elm) {
            username_elm = document.createElement("div");
            username_elm.id = username;
            username_elm.className = "username";

            let username_p = document.createElement("p");
            username_p.appendChild(document.createTextNode("Username: " + username)); 

            let id_p = document.createElement("p");
            id_p.appendChild(document.createTextNode("ID: " + ids[i]));
            
            username_elm.appendChild(username_p);
            username_elm.appendChild(id_p);
            document.getElementById("usernames").appendChild(username_elm);
        }
    }

}

function draw_bullets() {
    let bullets = data.Bullets;
    let keys = Object.keys(bullets);
    for (let i = 0; i < keys.length; i++) {
        draw_rect(bullets[keys[i]].x, bullets[keys[i]].y, 3, 3);
    }
}

function draw_text(text, x, y) {
    ctx.textAlign = "center";
    ctx.font = "18px Arial";
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "#FFFFFF";
    ctx.imageSmoothingEnabled = true;

    ctx.fillText(text, x, y);
}

function draw_players() {
    let players = data.Players;
    let keys = Object.keys(players);
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == data.LocalID) continue;
        draw_text(data.Usernames[keys[i]], players[keys[i]].x, players[keys[i]].y);
        draw_rect(players[keys[i]].x, players[keys[i]].y - 5, 5, 5);
    }
}

function update_cords(x, y, data) {
    document.getElementById("xCords").innerHTML = x;
    document.getElementById("yCords").innerHTML = y;
    x = parseInt(x);
    y = parseInt(y);

    draw_rect(x, y, 5, 5);
}


function select_username(username) {
    let username_elm = document.getElementById(username);
    username_elm.scrollIntoView();
}

function get_username_hovered(x, y) {
    let keys = Object.keys(players); 
    for (let i = 0; i < keys.length; i++) {
        let player = players[keys[i]];
    }
}



function main() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#000000";


    canvas.addEventListener("mousemove", (e) => {
        let rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        get_username_hovered(x, y);
    });


}

//call main when dom is loaded
document.addEventListener("DOMContentLoaded", main);