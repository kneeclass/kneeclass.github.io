import React from 'react';
import { addDecorator,storiesOf } from '@storybook/react';
import ReactMarkdown from 'react-markdown';
import mdBreaks from 'remark-breaks'
//components
import Button from './button/button.js'
import SimpleList from './lists/simpleList.js'
import Introduction from './introduction/introduction.js'
import ContentfulPage from'./contentfulPage/contentfulPage.js'

//md
import Markdown from './introduction/text.md'

//addons
import { withKnobs, text} from '@storybook/addon-knobs';
import { withOptions } from '@storybook/addon-options';


//graphql
import { GraphQLClient } from 'graphql-request'

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
.addDecorator(CenterDecorator)
  .add(
    'Välkommen',() => (
      <Introduction>
        <ReactMarkdown source={Markdown} />
      </Introduction>
    ),
  );

const query = `{
  designsystemSidaCollection{
  	items{
      sys{
        id
      }
      titel
      rubrik
      text
    }
	}
}`


var request = new XMLHttpRequest();
request.open("POST", 'https://graphql.contentful.com/content/v1/spaces/fpxuvij189yu', false);
request.setRequestHeader('authorization', "Bearer 6cd1c7ece94e09c69ee47b75f6f1c1a47d5edd59f8558d6ebd7d25d731466630")
request.setRequestHeader('Content-Type', "application/json")
request.send(JSON.stringify({
  query,
}));  


if (request.status === 200) {
  var response = JSON.parse(request.responseText)
  response.data.designsystemSidaCollection.items.forEach(i => {
    storiesOf('Documentation', module)
      .add(i.titel,() => (
          <ContentfulPage>
            <h1>{i.rubrik}</h1>
            <ReactMarkdown source={i.text} plugins={[mdBreaks]} />
          </ContentfulPage>
        ),
      );
  });

}




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