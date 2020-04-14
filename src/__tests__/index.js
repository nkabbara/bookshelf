import {screen, prettyDOM} from '@testing-library/react'
import chalk from 'chalk'

beforeAll(() => {
  const root = document.createElement('div')
  root.id = 'root'
  document.body.append(root)
})

test('renders the app', () => {
  // 🐨 If you want to run these tests on your own stuff, then uncomment this:
  // require('../index')

  // 💣 and delete this line:
  require('../index.final')

  screen.getByTitle('Bookshelf')
  screen.getByRole('heading', {name: /Bookshelf/i})
  screen.getByRole('button', {name: /Login/i})
  screen.getByRole('button', {name: /Register/i})

  const cssEl = document.querySelector('[css]')
  try {
    expect(cssEl).toBeNull()
  } catch (error) {
    throw new Error(
      chalk
        .red(
          `
        🚨  At least one element has an attribute called "css". This means that emotion did not compile the prop correctly.
        Make sure to include this at the top of the file:
/** @jsx jsx */
/** @jsxFrag React.Fragment */
import {jsx} from '@emotion/core'

Here's the element that has the css attribute that wasn't compiled:
`,
        )
        .trim() +
        '\n\n' +
        prettyDOM(cssEl),
    )
  }

  try {
    expect(document.body.innerHTML).toContain('class="css-')
  } catch (error) {
    throw new Error(
      chalk.red(
        `🚨  None of your elements are styled by emotion. Make sure to render a styled component and use the css prop.`,
      ),
    )
  }
})
