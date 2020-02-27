import React from "react";
import renderer from "react-test-renderer";
import withAudio from "./with-audio.jsx";
import PropTypes from "prop-types";

const MockComponent = (props) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

const MockComponentWrapper = withAudio(MockComponent);

it(`withAudio is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapper
      isPlaying={true}
      onPlayButtonClick={() => {}}
      src={``}
    />
  ), {
    createNodeMock() {
      return {};
    }
  })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
