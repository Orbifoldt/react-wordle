import { ComponentMeta, ComponentStory } from "@storybook/react";
import { fillToSize } from "../../common/functional-method";
import { Score } from "../../game-logic/game-controller";
import GameBoard from "./game-board";

export default {
    title: "Molecules/GameBoard",
    component: GameBoard,
} as ComponentMeta<typeof GameBoard>


const Template: ComponentStory<typeof GameBoard> = (args) => <GameBoard {...args} />;

const unscoredArray = [Score.UNSCORED, Score.UNSCORED, Score.UNSCORED, Score.UNSCORED, Score.UNSCORED]
const emptyGuess = ["", "", "", "",""]

export const MidGame = Template.bind({})
MidGame.args = {
    guesses: [
        "DORMS".split(''),
        "TRACE".split(''),
        "CRAZE".split(''),
        [..."CREP".split(''), ""],
        emptyGuess
    ],
    scores: [
        [Score.GRAY, Score.GRAY, Score.YELLOW, Score.GRAY, Score.GRAY],
        [Score.GRAY, Score.GREEN, Score.GRAY, Score.YELLOW, Score.GREEN],
        [Score.GREEN, Score.GREEN, Score.GRAY, Score.GRAY, Score.GREEN],
        unscoredArray,
        unscoredArray
    ]
}

export const Finished = Template.bind({})
Finished.args = {
    guesses: [
        "DORMS".split(''),
        "TRACE".split(''),
        "CRAZE".split(''),
        "CREPE".split(''),
        emptyGuess
    ],
    scores: [
        [Score.GRAY, Score.GRAY, Score.YELLOW, Score.GRAY, Score.GRAY],
        [Score.GRAY, Score.GREEN, Score.GRAY, Score.YELLOW, Score.GREEN],
        [Score.GREEN, Score.GREEN, Score.GRAY, Score.GRAY, Score.GREEN],
        [Score.GREEN, Score.GREEN, Score.GREEN, Score.GREEN, Score.GREEN],
        unscoredArray
    ]
}

export const Empty = Template.bind({})
Empty.args = {
    guesses: fillToSize([], 5, emptyGuess),
    scores: fillToSize([], 5, unscoredArray)
}