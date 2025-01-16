import err from "../assets/err.mp3";
import mess from "../assets/mess.mp3";


const sound = {};

sound.mess = () => {
    const audio = new Audio(mess);
    audio.play();
};

sound.err = () => {
    const audio = new Audio(err);
    audio.play();
}

export default sound;