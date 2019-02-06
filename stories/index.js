import React from 'react';
import { addDecorator,storiesOf } from '@storybook/react';
import ReactMarkdown from 'react-markdown';
//components
import Button from './button/button.js'
import SimpleList from './lists/simpleList.js'
import Introduction from './introduction/introduction.js'

//md
import Markdown from './introduction/text.md'

//addons
import { withKnobs, text} from '@storybook/addon-knobs';
import { withOptions } from '@storybook/addon-options';
import { withInfo } from '@storybook/addon-info';

addDecorator(
  withOptions({
    name: 'Konsumentverket Designsystem',
    hierarchySeparator: /\|/ 
  })
);

const rootStyles = {
  width: '100%',
  display: 'flex',
  height: '90vh',
  justifyContent: 'center',
};

const itemStyles ={
  alignSelf: 'center'
}

const CenterDecorator = (storyFn) => (
  <div style={rootStyles}>
    <div style={itemStyles}>
      { storyFn() }
    </div>
  </div>
);


storiesOf('Documentation', module)
  .add(
    'Välkommen',
    withInfo()(() => (
      <Introduction>
        <ReactMarkdown source={Markdown} />
      </Introduction>
    )),
  );


const buttonStories = storiesOf('Komponenter|Knappar', module)
.addDecorator(CenterDecorator)
buttonStories.addDecorator(withKnobs);
buttonStories.add('Knapp 1', () => {
  const theText = text("Text","Jag är knappens text");
  return <Button text={theText}></Button>
});


const listStories = storiesOf('Komponenter|Listor', module)
.addDecorator(CenterDecorator)
listStories.add('Enkel lista', () => {
  
  var list = [
    {name:'test1'},
    {name:'test2'},
    {name:'test3'},
    {name:'test4'},
  ]

  return <SimpleList listItems={list} />
});