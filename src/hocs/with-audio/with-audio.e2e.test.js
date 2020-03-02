import React from "react";
import PropTypes from "prop-types";
import withAudio from "./with-audio.jsx";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure(
    {
      adapter: new Adapter(),
    }
);

const Player = (props) => {
  const {onPlayButtonClick, children} = props;

  return (
    <div>
      <button onClick={onPlayButtonClick} />
      {children}
    </div>
  );
};

Player.propTypes = {
  onPlayButtonClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

it(`Checks that HOC's callback turn on audio (play)`, () => {
  const PlayerWrapper = withAudio(Player);
  const wrapper = mount(
      <PlayerWrapper
        isPlaying={false}
        onPlayButtonClick={()=>{}}
        src=""
      />
  );

  window.HTMLMediaElement.prototype.play = () => {};

  const {_audioRef} = wrapper.instance();

  jest.spyOn(_audioRef.current, `play`);

  wrapper.instance().componentDidMount();

  wrapper.find(`button`).simulate(`click`);

  expect(_audioRef.current.play).toHaveBeenCalledTimes(1);
});


it(`Checks that HOC's callback turn on audio (pause)`, () => {
  const PlayerWrapper = withAudio(Player);
  const wrapper = mount(
      <PlayerWrapper
        isPlaying={true}
        onPlayButtonClick={()=>{}}
        src=""
      />
  );

  window.HTMLMediaElement.prototype.pause = () => {};

  const {_audioRef} = wrapper.instance();

  jest.spyOn(_audioRef.current, `pause`);

  wrapper.instance().componentDidMount();

  wrapper.find(`button`).simulate(`click`);

  expect(_audioRef.current.pause).toHaveBeenCalledTimes(1);
});
