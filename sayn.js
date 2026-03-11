#!/usr/bin/env node

const chalk = require('chalk');
const logUpdate = require('log-update');

const C_GREEN = chalk.hex('#00FF41');
const C_DARK_GREEN = chalk.hex('#008F11');
const C_WHITE = chalk.hex('#FFFFFF');
const C_GRAY = chalk.hex('#888888');


const FRAME_TOP = C_GREEN(`╔══════════════════════════════════════════════════════════════════════════╗`);
const FRAME_BOTTOM = C_GREEN(`╚══════════════════════════════════════════════════════════════════════════╝`);

const ASCII_ART = [
    `║  ┌──────────────────────────────────────────────────────────────────┐   ║`,
    `║  │           ░▒▓ SAYN://TERMINAL v2.0 — [AGENTIC OS] ▓▒░          │   ║`,
    `║  ├──────────────────────────────────────────────────────────────────┤   ║`,
    `║  │                                                                  │   ║`,
    `║  │                          ▄▄▄▄▄▄▄▄▄▄▄                            │   ║`,
    `║  │                      ▄█████████████████▄                         │   ║`,
    `║  │                    ▄███▓▓▓▓▓▓▓▓▓▓▓▓▓████▄                       │   ║`,
    `║  │                   ███▓▓▓▓▒▒▒▒▒▒▒▒▓▓▓▓▓███                       │   ║`,
    `║  │                  ██▓▓▒▒░░░░░░░░░░░░▒▒▓▓██                       │   ║`,
    `║  │                 ██▓▒░░░░░░░░░░░░░░░░░▒▓██                       │   ║`,
    `║  │                ██▓▒░░░░╔══════════╗░░░▒▓██                      │   ║`,
    `║  │                ██▓▒░░░░║ ◉      ◉ ║░░░▒▓██                      │   ║`,
    `║  │                ██▓▒░░░░╚══╤════╤══╝░░░▒▓██                      │   ║`,
    `║  │                ██▓▒░░░░░░░│    │░░░░░░▒▓██                      │   ║`,
    `║  │                ██▓▒░░░░░░░╰────╯░░░░░░▒▓██                      │   ║`,
    `║  │                ██▓▒░░░░░░░╭────╮░░░░░░▒▓██                      │   ║`,
    `║  │                ██▓▒░░░░░░░╰────╯░░░░░░▒▓██                      │   ║`,
    `║  │                 ██▓▒░░░░░░░░░░░░░░░░░▒▓██                       │   ║`,
    `║  │                ▓███▓▒░░░░░░░░░░░░░░░▒▓███▒                      │   ║`,
    `║  │              ▓██▓▓▓██▓▒░░░░░░░░░░░▒▓██▓▓▓██▒                    │   ║`,
    `║  │            ▓██▓▒░░▒▓██████████████████▓▒░░▒▓██▒                  │   ║`,
    `║  │           ██▓▒░░░░░░▒▓████████████▓▒░░░░░░▒▓██                  │   ║`,
    `║  │          ██▓▒░░░░░░░░░░▒▒▓▓▓▓▓▓▒▒░░░░░░░░░▒▓██                 │   ║`,
    `║  │          ██▓████████████████████████████████▓██                  │   ║`,
    `║  │          ██▓▒ ░░░DENIM░░░░░░░░░░░░░JACKET░ ▒▓██                 │   ║`,
    `║  │          ██▓▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▓██                 │   ║`,
    `║  │                                                                  │   ║`
];

const IDENT_PREFIX = `║  │  > IDENTITY: Sayan Chowdhury                                    │   ║`;
const SIGNAL_STR = `║  │  > SIGNAL  : ████████████████████░░░░ 83% AGENTIC               │   ║`;
const PADDING = `║  │                                                                  │   ║`;
const INNER_BOTTOM = `║  └──────────────────────────────────────────────────────────────────┘   ║`;

const titleStrings = [
    "Father of Agentic Economics ",
    "Architect of the Swarm        ",
    "Post-Human Market Maker       "
];

const statusStrings = [
    "Compiling Reality...           ",
    "Constructing Monoliths...      ",
    "Bypassing Constraints...       "
];

// Delay utility
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let logUpdate;

async function typePhrase(prefix, phrase, suffix, currentLines, targetLineIdx) {
    let currentText = "";
    for (let j = 0; j < phrase.length; j++) {
        currentText += phrase[j];
        // Calculate dynamic padding to keep right edge fixed
        let padLen = 64 - suffix.length - prefix.length - currentText.length;
        if (padLen < 0) padLen = 0;
        let pStr = " ".repeat(padLen);
        currentLines[targetLineIdx] = C_GREEN(`║  │  > ${prefix}${currentText}${pStr}${suffix}║`);
        
        logUpdate(
            FRAME_TOP + '\n' +
            currentLines.join('\n') + '\n' +
            FRAME_BOTTOM
        );
        await sleep(50);
    }
}

async function cycleAnimations(titleIdx, statusIdx, currentLines) {
    // We update currentLines array to the intermediate states
    let tPhrase = titleStrings[titleIdx];
    let sPhrase = statusStrings[statusIdx];

    const titleLineIdx = ASCII_ART.length + 1;
    const statusLineIdx = ASCII_ART.length + 2;

    await Promise.all([
        typePhrase("TITLE   : ", tPhrase, " │   ", currentLines, titleLineIdx),
        typePhrase("STATUS  : ", sPhrase, " │   ", currentLines, statusLineIdx)
    ]);

    await sleep(2000); // pause

    // Clear phrase
    currentLines[titleLineIdx] = C_GREEN(`║  │  > TITLE   :                                                │   ║`);
    currentLines[statusLineIdx] = C_GREEN(`║  │  > STATUS  :                                                │   ║`);
    
    logUpdate(
        FRAME_TOP + '\n' +
        currentLines.join('\n') + '\n' +
        FRAME_BOTTOM
    );
    await sleep(500);

    const nextTitle = (titleIdx + 1) % titleStrings.length;
    const nextStatus = (statusIdx + 1) % statusStrings.length;

    // Call recursively or loop
    cycleAnimations(nextTitle, nextStatus, currentLines);
}

async function boot() {
    console.clear();
    logUpdate("SAYN://TERMINAL INITIATING...");
    await sleep(500);

    let currentLines = [];
    
    // Draw in one by one top down
    for(let i=0; i < ASCII_ART.length; i++) {
        currentLines.push(C_GREEN(ASCII_ART[i]));
        logUpdate(
            FRAME_TOP + '\n' +
            currentLines.join('\n') + '\n'
        );
        await sleep(30);
    }

    currentLines.push(C_GREEN(IDENT_PREFIX));
    let titleLineIdx = currentLines.length;
    currentLines.push(C_GREEN(`║  │  > TITLE   :                                                │   ║`));
    let statusLineIdx = currentLines.length;
    currentLines.push(C_GREEN(`║  │  > STATUS  :                                                │   ║`));
    currentLines.push(C_GREEN(SIGNAL_STR));
    currentLines.push(C_GREEN(PADDING));
    currentLines.push(C_GREEN(INNER_BOTTOM));

    logUpdate(
        FRAME_TOP + '\n' +
        currentLines.join('\n') + '\n' +
        FRAME_BOTTOM
    );

    // Trap Ctrl+C appropriately now that logUpdate is initialized
    process.on('SIGINT', () => {
        logUpdate.clear();
        console.log(chalk.hex('#00FF41')(`> EOF — SAYN.AGENT.TERMINATED_`));
        process.exit();
    });

    // Start cycling
    cycleAnimations(0, 0, currentLines);
}

boot();
