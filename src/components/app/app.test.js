import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {App} from "./app.jsx";
import {Steps, MAX_MISTAKES} from "../../const.js";
import NameSpace from "../../reducer/name-space.js";
import {AuthorizationStatus} from "../../const.js";


const mockStore = configureStore([]);

const questions = [
  {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
        genre: `rock`,
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
        genre: `blues`,
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
        genre: `jazz`,
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
        genre: `rock`,
      },
    ],
  },
  {
    type: `artist`,
    song: {
      artist: `Ramones`,
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    },
    answers: [
      {
        picture: `https://api.adorable.io/avatars/128/1`,
        artist: `Ramones`,
      },
      {
        picture: `https://api.adorable.io/avatars/128/2`,
        artist: `Nirvana`,
      },
      {
        picture: `https://api.adorable.io/avatars/128/3`,
        artist: `Cranberries`,
      },
    ],
  }
];

describe(`Render App`, () => {
  it(`Render WelcomeScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 0,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      }
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              authorizationStatus={AuthorizationStatus.NO_AUTH}
              login={() => {}}
              maxMistakes={MAX_MISTAKES}
              mistakes={0}
              questions={questions}
              onUserAnswer={() => {}}
              onWelcomeButtonClick={() => {}}
              step={Steps.NO_STEPS}
              resetGame={()=>{}}
            />
          </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render GenreQuestionScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 3,
      }
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              authorizationStatus={AuthorizationStatus.NO_AUTH}
              login={() => {}}
              maxMistakes={MAX_MISTAKES}
              mistakes={0}
              questions={questions}
              onUserAnswer={() => {}}
              onWelcomeButtonClick={() => {}}
              step={Steps.GENRE}
              resetGame={()=>{}}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render ArtistQuestionScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 3,
      }
    });


    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              authorizationStatus={AuthorizationStatus.NO_AUTH}
              login={() => {}}
              maxMistakes={MAX_MISTAKES}
              mistakes={0}
              questions={questions}
              onUserAnswer={() => {}}
              onWelcomeButtonClick={() => {}}
              step={Steps.ARTIST}
              resetGame={()=>{}}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render GameWinScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 3,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            authorizationStatus={AuthorizationStatus.AUTH}
            login={() => {}}
            maxMistakes={MAX_MISTAKES}
            mistakes={0}
            questions={questions}
            onUserAnswer={()=>{}}
            onWelcomeButtonClick={()=>{}}
            resetGame={()=>{}}
            step={3}/>
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render AuthorizationScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 3,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            login={() => {}}
            maxMistakes={MAX_MISTAKES}
            mistakes={0}
            questions={questions}
            onUserAnswer={()=>{}}
            onWelcomeButtonClick={()=>{}}
            resetGame={()=>{}}
            step={3}/>
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render GameOverScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 3,
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            login={() => {}}
            maxMistakes={MAX_MISTAKES}
            mistakes={3}
            questions={questions}
            onUserAnswer={()=>{}}
            onWelcomeButtonClick={()=>{}}
            resetGame={()=>{}}
            step={1}/>
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
