module.exports = {
    settings: {
        startingCardCount: 3,
        actionCards: [
            {
                name: "Flat Tire",
                desc: "Lorem ipsum",
                count: 10
                },
            {
                name: "Card 2",
                desc: "Lorem ipsum",
                count: 5
                },
            {
                name: "Card 3",
                desc: "Lorem ipsum",
                count: 10
                },
            {
                name: "Card 4",
                desc: "Lorem ipsum",
                count: 5
                }
            ],
        candidateCards: [
            {
                name: "The Senator",
                desc: "Lorem ipsum",
                reputation: 2,
                homeRegion: "Region 1",
                image: "senator.jpg"
            },
            {
                name: "The Governor",
                desc: "Lorem ipsum",
                reputation: 3,
                homeRegion: "Region 3",
                image: "governor.jpg"
            },
            {
                name: "The Frontrunner",
                desc: "Lorem ipsum",
                reputation: 4,
                homeRegion: "Region 5",
                image: "frontrunner.jpg"
            },
            {
                name: "The Newcomer",
                desc: "Lorem ipsum",
                reputation: 1,
                homeRegion: "Region 7",
                image: "newcomer.jpg"
            },
            {
                name: "The Gaffe Machine",
                desc: "Lorem ipsum",
                reputation: 2,
                homeRegion: "Region 9",
                image: "gaffemachine.jpg"
            },
            {
                name: "The Old Timer",
                desc: "Lorem ipsum",
                reputation: 2,
                homeRegion: "Region 11",
                image: "oldtimer.jpg"
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
    dealCards: function (game, settings) {
        for (var i in game.players) {
            for (var j = 0; j < settings.startingCardCount; j++) {
                game.players[i].hand.push(game.actionCards.pop());
            }
            game.players[i].candidateCard = game.candidateCards[i];
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
            deck.push({
                name: source[i].name,
                desc: source[i].desc
            });
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
            image: source[i].image
        });
    }
    return deck;
}