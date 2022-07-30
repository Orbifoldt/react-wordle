import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Score } from "../../game-logic/game-controller";
import TileRow from "./tile-row";

export default {
    title: "Molecules/TileRow",
    component: TileRow,
} as ComponentMeta<typeof TileRow>


const Template: ComponentStory<typeof TileRow> = (args) => <TileRow {...args} />;


const unscoredArray = [Score.UNSCORED, Score.UNSCORED, Score.UNSCORED, Score.UNSCORED, Score.UNSCORED]

export const FilledAndScored = Template.bind({})
FilledAndScored.args = {
    guess: "TRACE".split(''),
    score: [Score.GRAY, Score.GREEN, Score.GRAY, Score.YELLOW, Score.GREEN]
}

export const UnscoredPartial = Template.bind({})
UnscoredPartial.args = {
    guess: [..."PAL".split(''), "",""],
    score: unscoredArray
}

export const Empty = Template.bind({})
Empty.args = {
    guess: ["", "", "", "",""],
    score: unscoredArray
}