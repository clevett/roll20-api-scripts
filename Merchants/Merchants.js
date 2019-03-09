// !merchant - Pulls up the menu and allows the GM to generate random loot
// Red Colour: #7E2D40

var MerchantGenerator = MerchantGenerator || (function() {
    'use strict';
    const colour     = '#7E2D40';
    const divstyle   = 'style="width: 189px; border: 1px solid black; background-color: #ffffff; padding: 5px;"';
    const astyle1    = 'style="text-align:center; border: 1px solid black; margin: 1px; padding: 2px; background-color: ' + colour + '; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 100px;';
    const astyle2    = 'style="text-align:center; border: 1px solid black; margin: 1px; padding: 2px; background-color: ' + colour + '; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 150px;';
    const arrowstyle = 'style="border: none; border-top: 3px solid transparent; border-bottom: 3px solid transparent; border-left: 195px solid ' + colour + '; margin-bottom: 2px; margin-top: 2px;"';
    const headstyle  = 'style="color: ' + colour + '; font-size: 18px; text-align: left; font-constiant: small-caps; font-family: Times, serif;"';
    const substyle   = 'style="font-size: 11px; line-height: 13px; margin-top: -2px; font-style: italic;"';
    const version = '1.0',
    
    handleInput = (msg) => {
        const args = msg.content.split(",");
        
        if (msg.type !== "api") {
            return;
        }
        
        if(playerIsGM(msg.playerid)){
            switch(args[0]) {
                case '!merchant':
                    merchantMenu();
                    break;
                case '!merchantOutput':
                    merchantOutput(msg);
                    break;
            }
        }
    },
    
    merchantMenu = () => {
        sendChat('Merchant Generator', '/w gm <div ' + divstyle + '>' + //--
            '<div ' + headstyle + '>Merchant Generator</div>' + //--
            '<div ' + substyle + '>Menu (v.' + version + ')</div>' + //--
            '<div ' + arrowstyle + '></div>' + //--
            '<div style="text-align:center;"><a ' + astyle2 + '" href="!merchantOutput">Merchant</a></div>' + //--
            '</div>'
        );
    },
    
    merchantOutput = (msg) => {
        const merchantRoll = Math.floor(Math.random() * 99) + 1;
        const merchant = 
            (merchantRoll >= 1 && merchantRoll <= 6) ? "Alcohol and refreshment" :
            (merchantRoll >= 7 && merchantRoll <= 10) ? "Animals" :
            (merchantRoll >= 11 && merchantRoll <= 15) ? "Books and maps" :
            (merchantRoll >= 16 && merchantRoll <= 19) ? "Flowers and seeds" :
            (merchantRoll >= 20 && merchantRoll <= 25) ? "Food and animal parts" :
            (merchantRoll >= 26 && merchantRoll <= 29) ? "Furniture and interior decor" :
            (merchantRoll >= 30 && merchantRoll <= 34) ? "High fashion" :
            (merchantRoll >= 35 && merchantRoll <= 38) ? "Jewelry and gems" :
            (merchantRoll >= 39 && merchantRoll <= 43) ? "Knick-knacks" :
            (merchantRoll >= 44 && merchantRoll <= 48) ? "Leatherworking" :
            (merchantRoll >= 49 && merchantRoll <= 52) ? "Mechanical contraptions" :
            (merchantRoll >= 53 && merchantRoll <= 57) ? "Medium and heavy armor, shields" :
            (merchantRoll >= 58 && merchantRoll <= 61) ? "Potions, poisons, and herbs" : 
            (merchantRoll >= 62 && merchantRoll <= 66) ? "Religious idols and blessings" :
            (merchantRoll >= 67 && merchantRoll <= 71) ? "Songs and instruments" : 
            (merchantRoll >= 71 && merchantRoll <= 75) ? "Spell tomes and scrolls" :
            (merchantRoll >= 76 && merchantRoll <= 80) ? "Trieving supplies" : 
            (merchantRoll >= 81 && merchantRoll <= 86) ? "Tools" : 
            (merchantRoll >= 87 && merchantRoll <= 91) ? "Vehicles and transportation" :
            (merchantRoll >= 92 && merchantRoll <= 96) ? "Weapons" :
            "Legendary merchant";

        const qualityRoll = Math.floor(Math.random() * 11) + 1;
        const quality = 
            (qualityRoll === 1) ? "Atrocious" :
            (qualityRoll >= 2 && qualityRoll <= 4) ? "Poor" : 
            (qualityRoll >= 5 && qualityRoll <= 7) ? "Medium" :
            (qualityRoll >= 8 && qualityRoll <= 10) ? "Good" :
            "Excellent";

        const goldRoll = Math.floor(Math.random() * 9) + 1;
        const currencyOnHand = 
            (qualityRoll === 1) ? Math.floor(goldRoll * 20) :
            (qualityRoll >= 2 && qualityRoll <= 4) ? Math.floor(goldRoll * 50) : 
            (qualityRoll >= 5 && qualityRoll <= 7) ? Math.floor(goldRoll * 100) :
            (qualityRoll >= 8 && qualityRoll <= 10) ? Math.floor(goldRoll * 250) :
            Math.floor(goldRoll * 500);

         sendChat('Merchant Generator', '/w gm <div ' + divstyle + '>' + //--
            '<div ' + headstyle + '>Merchant</div>' + //--
            '<div ' + arrowstyle + '></div>' + //--
            '<div style="text-align:center; font-weight:bold;">' + merchant + '</div>' + //--
            `<div style="text-align:center;">${quality}, ${currencyOnHand} gp</div>` + //--
            `<div style="text-align:center;"><a href="https://donjon.bin.sh/fantasy/random/#type=npc;npc-order=common">Names</a></div>` + //--
            '</div>'
        );
    },
    
    registerEventHandlers = function() {
        on('chat:message', handleInput);
    };

    return {
        RegisterEventHandlers: registerEventHandlers
    };
    
}());

on("ready",() => {
    'use strict';
    MerchantGenerator.RegisterEventHandlers();
});