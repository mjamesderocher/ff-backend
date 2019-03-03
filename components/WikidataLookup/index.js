import React from 'react'
import PropTypes from 'prop-types'
import PatchEvent, {set, unset} from 'part:@sanity/form-builder/patch-event'
import {setIfMissing} from 'part:@sanity/form-builder/patch-event'
import Fieldset from 'part:@sanity/components/fieldsets/default'
import {FormBuilderInput} from 'part:@sanity/form-builder'

export default class WikidataLookup extends React.Component {
  static propTypes = {
    type: PropTypes.shape({
      title: PropTypes.string
    }).isRequired,

    level: PropTypes.number,
    value: PropTypes.shape({
      _type: PropTypes.string,
      wikidataId: PropTypes.string,
      wikidataLookup: PropTypes.string
    }),
    focusPath: PropTypes.array,
    onFocus: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired
  }

  firstFieldInput = React.createRef()

  // this is called by the form builder whenever this input should receive focus
  focus() {
    this.firstFieldInput.current.focus()
  }

  populateFields = (id) => {
    const {type} = this.props

    //Get info from Wikidata
    const url = `https://www.wikidata.org/wiki/Special:EntityData/${id}.json`
    let select = ''
    let properties = ''

    Object.entries(type.options.wikidataFields).forEach(entry => {
      let key = entry[0];
      let value = entry[1];
      //use key and value here
      select = select.concat('?', key , ' ?' , key , 'Label ')
      properties = properties.concat('OPTIONAL { ?item wdt:' , value , ' ?' , key , '. } ')
    });

    const endpointUrl = 'https://query.wikidata.org/sparql'
    const sparqlQuery = `SELECT ?item ?label ${select} WHERE {
        BIND(wd:${id} AS ?item)
        ?item rdfs:label ?label.
        ${properties}
        FILTER((LANG(?label)) = "en")
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      }
      LIMIT 10`
    const fullUrl = endpointUrl + '?query=' + encodeURIComponent( sparqlQuery )
    const headers = { 'Accept': 'application/sparql-results+json' };

    fetch( fullUrl, { headers } )
      .then( body => {
        if(body.ok) {
          return body.json() 
        } else {
          console.log("error")
        }
      }).then(b => console.log(b))

    const nextValue = {
      _type: type.name
    }
  }

  handleSelect = (title, element) => {
    const {type, value} = this.props
    const id = element.value
    const nextValue = {
      _type: type.name,
      wikidataId: id
    }
    this.setState({
      input: title
    })

    const patch = title === '' ? unset() : set(nextValue)
    this.props.onChange(PatchEvent.from(patch))
  }

  handleFieldChange = (field, fieldPatchEvent) => {
    const {onChange, type} = this.props
    if(field.name === "wikidataId") {
      this.populateFields(fieldPatchEvent.patches[0].value)
    }
    // Whenever the field input emits a patch event, we need to make sure to each of the included patches
    // are prefixed with its field name, e.g. going from:
    // {path: [], set: <nextvalue>} to {path: [<fieldName>], set: <nextValue>}
    // and ensure this input's value exists
    onChange(fieldPatchEvent.prefixAll(field.name).prepend(setIfMissing({_type: type.name})))
  }

  render() {
    const {type, value, level, focusPath, onFocus, onBlur} = this.props

    return (
      <Fieldset level={level} legend={type.title} description={type.description}>
        <div>
          {type.fields.map((field, i) => (
            // Delegate to the generic FormBuilderInput. It will resolve and insert the actual input component
            // for the given field type
            <FormBuilderInput
              level={level + 1}
              ref={i === 0 ? this.firstFieldInput : null}
              key={field.name}
              type={field.type}
              value={value && value[field.name]}
              onChange={patchEvent => this.handleFieldChange(field, patchEvent)}
              { ...((field.name === 'wikidataLookup') && { onSelect: this.handleSelect })}
              path={[field.name]}
              focusPath={focusPath}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          ))}
        </div>
      </Fieldset>
    )
  }
}