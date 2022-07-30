import { ComponentStory } from "@storybook/react";
import { Modal } from "./modal";

export default {
    title: "Molecules/Modal",
    component: Modal
}

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args}/>


export const Default = Template.bind({})
Default.args = {
    text: "This is some text. And another sentence.",
    visible: true,
    onClose: () => console.log("Closing")
}
