module.exports = {
    settings: {
        startingCardCount: 3,
        actionCards: [
            {
                name: "Win the Game",
                desc: "Play this card to collect all votes",
                count: 5,
                play: gameEndTest
            },
            {
                name: "Flat Tire",
                desc: "Play this card anytime. This card removes two movements from your opponents travel.",
                /*count: 10*/
                count: 0
                },
            {
                name: "Take a Picture with a Baby",
                desc: "Playing this card earns you one extra vote card for one region during one turn only.",
                /*count: 5,*/
                count: 5,
                play: pictureWithBaby
                },
            {
                name: "Negative Ad",
                desc: "Set this card in front of you. At the beginning of your turn, if the Public Sentiment card is thumbs down, remove one vote from your starting state to your hand.",
                /*count: 5*/
                count: 0
                },
            {
                name: "Negative Ad",
                desc: "Set this card in front of you. At the beginning of your turn, if the Public Sentiment card is thumbs up, remove one vote from your starting state to your hand.",
                /*count: 5*/
                count: 0
                },
            {
                name: "Positive Ad",
                desc: "Set this card in front of you. At the beginning of your turn, if the Public Sentiment card is thumbs down, add one vote from your starting state to your hand.",
                /*count: 5*/
                count: 0
                },
            {
                name: "Positive Ad",
                desc: "Set this card in front of you. At the beginning of your turn, if the Public Sentiment card is thumbs up, add one vote from your starting state to your hand.",
                /*count: 5*/
                count: 0
                },
            {
                name: "Public Speech",
                desc: "Play this card for a chance to remove a distraction or a negative ad. If the next round’s Public Sentiment card is a thumbs up, you were convincing. If not, this card has no effect.",
                /*count: 5*/
                count: 0
                },
            {
                name: "Baggage",
                desc: "Upon drawing this card you must place it in front of your hand. Any negative ads in front of you are now twice as effective.",
                /*count: 5*/
                count: 0
                },
            {
                name: "Home Base",
                desc: "When played, set this card in front of your opponent’s hand. Requires your opponent to return to their home state for one turn. Lose 1 vote from the current region you are in for every turn this card is in effect.",
                /*count: 5*/
                count: 0
                },
            {
                name: "Moody Public",
                desc: "The public has changed it’s mind.. Turn over a new Public Sentiment card. Each of those new rules are in effect. ",
                /*count: 5*/
                count: 0
                },
            {
                name: "Clean Slate",
                desc: "You may play this card on yourself or any player. This card removes all of the positive and negative effects from a player",
                /*count: 5*/
                count: 0
                },
            {
                name: "1st Class Pass",
                desc: "During your turn, play this card in place of 2 movements then move your piece to any state that is not occupied.",
                /*count: 5*/
                count: 0
                },
            {
                name: "Public Blunder",
                desc: "Play this card immediately. Wherever you travel this turn, you must remove one vote from that region from your hand",
                /*count: 5*/
                count: 0
                },
            {
                name: "Broken Leg",
                desc: "You must play this card immediately. Your travel is restricted by one this turn",
                /*count: 5*/
                count: 0
                },
            {
                name: "All Nighter",
                desc: "Play this card at anytime to gain one extra movement",
                /*count: 5*/
                count: 0
                },
            {
                name: "“Hunting Accident”",
                desc: "Play this card immediately. Oops you shot your opponent in the butt during a hunting accident. If the Public Sentiment is thumbs up, gain one vote from your current location. If thumbs down, lose one random vote",
                /*count: 5*/
                count: 0
                }
            ],
        candidateCards: [
            {
                name: "The Senator",
                desc: "Lorem ipsum",
                reputation: 2,
                homeRegion: "Region 1",
                image: "senator.jpg",
                color: "green",
                startPos: {
                    x: 460,
                    y: 30
                }
            },
            {
                name: "The Governor",
                desc: "Lorem ipsum",
                reputation: 3,
                homeRegion: "Region 3",
                image: "governor.jpg",
                color: "purple",
                startPos: {
                    x: 420,
                    y: 100
                }
            },
            {
                name: "The Frontrunner",
                desc: "Lorem ipsum",
                reputation: 4,
                homeRegion: "Region 5",
                image: "frontrunner.jpg",
                color: "brown",
                startPos: {
                    x: 355,
                    y: 208
                }
            },
            {
                name: "The Newcomer",
                desc: "Lorem ipsum",
                reputation: 1,
                homeRegion: "Region 7",
                image: "newcomer.jpg",
                color: "gray",
                startPos: {
                    x: 355,
                    y: 90
                }
            },
            {
                name: "The Gaffe Machine",
                desc: "Lorem ipsum",
                reputation: 2,
                homeRegion: "Region 9",
                image: "gaffemachine.jpg",
                color: "pink",
                startPos: {
                    x: 280,
                    y: 80
                }
            },
            {
                name: "The Old Timer",
                desc: "Lorem ipsum",
                reputation: 2,
                homeRegion: "Region 11",
                image: "oldtimer.jpg",
                color: "white",
                startPos: {
                    x: 210,
                    y: 220
                }
            }
        ],
        regionCards: [
            {
                name: "Region 1",
                values: [3, 3, 4, 5, 5]
            },
            {
                name: "Region 2",
                values: [3, 3, 4, 5, 5]
            },
            {
                name: "Region 3",
                values: [3, 3, 4, 5, 5]
            },
            {
                name: "Region 4",
                values: [3, 3, 4, 5, 5]
            },
            {
                name: "Region 5",
                values: [2, 3, 4, 5, 6]
            },
            {
                name: "Region 6",
                values: [3, 4, 5, 5, 6]
            },
            {
                name: "Region 7",
                values: [4, 5, 5, 6]
            },
            {
                name: "Region 8",
                values: [4, 5, 5, 6]
            },
            {
                name: "Region 9",
                values: [3, 3, 4, 5, 5]
            },
            {
                name: "Region 10",
                values: [2, 3, 4, 5, 6]
            },
            {
                name: "Region 11",
                values: [3, 4, 5, 5, 6]
            },
            {
                name: "Region 12",
                values: [4, 5, 5, 6]
            },
            {
                name: "Region 13",
                values: [4, 5, 5, 6]
            },
            {
                name: "Region 14",
                values: [4, 5, 5, 6]
            },
            {
                name: "Region 15",
                values: [4, 5, 5, 6]
            },

        ],
    },
    createGame: function (settings) {
        return {
            name: "Game Name",
            players: [],
            currentPlayerIndex: 0,
            actionCards: createActionDeck(settings.actionCards),
            regionCards: createRegionDecks(settings.regionCards),
            candidateCards: createCandidateDeck(settings.candidateCards),
            defaultAirTravel: 1,
            defaultRoadTravel: 2
        }
    },
    shuffle: function (array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    },
    setup: function (game, settings) {
        for (var i in game.players) {
            for (var j = 0; j < settings.startingCardCount; j++) {
                game.players[i].hand.push(game.actionCards.pop());
            }
            game.players[i].candidateCard = game.candidateCards[i];
            game.players[i].x = game.players[i].candidateCard.startPos.x;
            game.players[i].y = game.players[i].candidateCard.startPos.y;
            game.players[i].color = game.players[i].candidateCard.color;
            game.players[i].currentRegion = game.players[i].candidateCard.homeRegion;
            game.players[i].regionCards = [takeRegionCard(game, game.players[i].candidateCard.homeRegion)];
        }
    },
    removePlayer: function (game, player) {
        //TODO: Add logic to return all of the players cards to the appropriate decks
        for (var i = 0; i < game.players.length; i++) {
            if (game.players[i].name == player) {
                game.players.splice(i, 1);
                break;
            }
        }
    },
    playCard: function (game, player, settings, cardName) {
        for (var i = 0; i < settings.actionCards.length; i++) {
            if (settings.actionCards[i].name == cardName) {
                if (settings.actionCards[i].play(game, player)) {
                    for (var j in game.players) {
                        if (game.players[j].name == player.name) {
                            for (var k = game.players[j].hand.length - 1; k >= 0; k--) {
                                if (game.players[j].hand[k].name == cardName) {
                                    game.players[j].hand.splice(k, 1);
                                    return true;
                                }
                            }
                        }
                    }
                };
                break;
            }
        }
        return false;
    },
    checkGameOver: function (game) {
        return game.regionCards.length == 0;
    }
};

function takeRegionCard(game, region) {
    var card;
    for (var i in game.regionCards) {
        if (game.regionCards[i].name == region) {
            card = game.regionCards.splice(i, 1)[0];
            break;
        }
    }
    return card;
}

function createActionDeck(source) {
    var deck = [];

    for (var i in source) {
        for (var j = 0; j < source[i].count; j++) {
            var card = {
                name: source[i].name,
                desc: source[i].desc
            }
            deck.push(card);
        }
    }


    return deck;
}

function createRegionDecks(source) {
    var deck = [];

    for (var i in source) {
        for (var j = 0; j < source[i].values.length; j++) {
            deck.push({
                name: source[i].name,
                value: source[i].values[j]
            });
        }
    }

    return deck;
}

function createCandidateDeck(source) {
    var deck = [];

    for (var i in source) {
        deck.push({
            name: source[i].name,
            desc: source[i].desc,
            reputation: source[i].reputation,
            homeRegion: source[i].homeRegion,
            image: source[i].image,
            color: source[i].color,
            startPos: source[i].startPos
        });
    }
    return deck;
}




/****************************************\
               ACTION CARDS
\****************************************/
function pictureWithBaby(game, player) {
    var card = takeRegionCard(game, player.currentRegion);
    if (card != undefined) {
        for (var i in game.players) {
            if (game.players[i].name == player.name) {
                game.players[i].regionCards.push(card);
            }
        }
        return true;
    } else {
        return false;
    }
}

function gameEndTest(game, player) {
    for (var k in game.players) {
        if (game.players[k].name == player.name) {
            for (var i = game.regionCards.length - 1; i >= 0; i--) {
                game.players[k].regionCards.push(takeRegionCard(game, game.regionCards[i].name));
            }
        }
    }
    return true;
}