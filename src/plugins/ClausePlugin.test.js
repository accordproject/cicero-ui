import { PluginManager, List, ToMarkdown } from '@accordproject/markdown-editor';
import { Value } from 'slate';

import ClausePlugin from './ClausePlugin';
import VariablePlugin from './VariablePlugin';

let toMarkdown = null;

beforeAll(() => {
  const clausePlugin = ClausePlugin(null, null);
  const pluginManager = new PluginManager([List(), clausePlugin, VariablePlugin()]);
  toMarkdown = new ToMarkdown(pluginManager);
});

const slateValueJSON = {
  object: 'value',
  document: {
    object: 'document',
    nodes: [
      {
        object: 'block',
        type: 'clause',
        data: {
          tag: 'clause',
          attributes: {
            src: 'ap://acceptance-of-delivery@0.12.0#b8eae2fb3c2571284b4dcfc1fc348d8234d0c5db158962043720828be2eb9085',
            clauseid: 'd3cdb02e-6982-47a1-9ba3-350d46212b63'
          },
          attributeString: 'src = "ap://acceptance-of-delivery@0.12.0#b8eae2fb3c2571284b4dcfc1fc348d8234d0c5db158962043720828be2eb9085"clauseid = "d3cdb02e-6982-47a1-9ba3-350d46212b63"',
          content: '',
          closed: false
        },
        nodes: [
          {
            object: 'block',
            type: 'paragraph',
            data: {

            },
            nodes: [
              {
                object: 'block',
                type: 'paragraph',
                data: {

                },
                nodes: [
                  {
                    object: 'text',
                    text: 'Acceptance of Delivery. ',
                    marks: [

                    ]
                  },
                  {
                    object: 'inline',
                    type: 'variable',
                    data: {
                      tag: 'variable',
                      attributes: {
                        id: 'shipper',
                        value: '%22Party%20A%22'
                      },
                      attributeString: 'id = "shipper"value = "%22Party%20A%22"',
                      content: '',
                      closed: true
                    },
                    nodes: [
                      {
                        object: 'text',
                        text: '"Party A"',
                        marks: [

                        ]
                      }
                    ]
                  },
                  {
                    object: 'text',
                    text: ' will be deemed to have completed its delivery obligations if in ',
                    marks: [

                    ]
                  },
                  {
                    object: 'inline',
                    type: 'variable',
                    data: {
                      tag: 'variable',
                      attributes: {
                        id: 'receiver',
                        value: '%22Party%20B%22'
                      },
                      attributeString: 'id = "receiver"value = "%22Party%20B%22"',
                      content: '',
                      closed: true
                    },
                    nodes: [
                      {
                        object: 'text',
                        text: '"Party B"',
                        marks: [

                        ]
                      }
                    ]
                  },
                  {
                    object: 'text',
                    text: "'s opinion, the ",
                    marks: [

                    ]
                  },
                  {
                    object: 'inline',
                    type: 'variable',
                    data: {
                      tag: 'variable',
                      attributes: {
                        id: 'deliverable',
                        value: '%22Widgets%22'
                      },
                      attributeString: 'id = "deliverable"value = "%22Widgets%22"',
                      content: '',
                      closed: true
                    },
                    nodes: [
                      {
                        object: 'text',
                        text: '"Widgets"',
                        marks: [

                        ]
                      }
                    ]
                  },
                  {
                    object: 'text',
                    text: ' satisfies the Acceptance Criteria, and ',
                    marks: [

                    ]
                  },
                  {
                    object: 'inline',
                    type: 'variable',
                    data: {
                      tag: 'variable',
                      attributes: {
                        id: 'receiver',
                        value: '%22Party%20B%22'
                      },
                      attributeString: 'id = "receiver"value = "%22Party%20B%22"',
                      content: '',
                      closed: true
                    },
                    nodes: [
                      {
                        object: 'text',
                        text: '"Party B"',
                        marks: [

                        ]
                      }
                    ]
                  },
                  {
                    object: 'text',
                    text: ' notifies ',
                    marks: [

                    ]
                  },
                  {
                    object: 'inline',
                    type: 'variable',
                    data: {
                      tag: 'variable',
                      attributes: {
                        id: 'shipper',
                        value: '%22Party%20A%22'
                      },
                      attributeString: 'id = "shipper"value = "%22Party%20A%22"',
                      content: '',
                      closed: true
                    },
                    nodes: [
                      {
                        object: 'text',
                        text: '"Party A"',
                        marks: [

                        ]
                      }
                    ]
                  },
                  {
                    object: 'text',
                    text: ' in writing that it is accepting the ',
                    marks: [

                    ]
                  },
                  {
                    object: 'inline',
                    type: 'variable',
                    data: {
                      tag: 'variable',
                      attributes: {
                        id: 'deliverable',
                        value: '%22Widgets%22'
                      },
                      attributeString: 'id = "deliverable"value = "%22Widgets%22"',
                      content: '',
                      closed: true
                    },
                    nodes: [
                      {
                        object: 'text',
                        text: '"Widgets"',
                        marks: [

                        ]
                      }
                    ]
                  },
                  {
                    object: 'text',
                    text: '.',
                    marks: [

                    ]
                  }
                ]
              },
              {
                object: 'block',
                type: 'paragraph',
                data: {

                },
                nodes: [
                  {
                    object: 'text',
                    text: 'Inspection and Notice. ',
                    marks: [

                    ]
                  },
                  {
                    object: 'inline',
                    type: 'variable',
                    data: {
                      tag: 'variable',
                      attributes: {
                        id: 'receiver',
                        value: '%22Party%20B%22'
                      },
                      attributeString: 'id = "receiver"value = "%22Party%20B%22"',
                      content: '',
                      closed: true
                    },
                    nodes: [
                      {
                        object: 'text',
                        text: '"Party B"',
                        marks: [

                        ]
                      }
                    ]
                  },
                  {
                    object: 'text',
                    text: ' will have ',
                    marks: [

                    ]
                  },
                  {
                    object: 'inline',
                    type: 'variable',
                    data: {
                      tag: 'variable',
                      attributes: {
                        id: 'businessDays',
                        value: '10'
                      },
                      attributeString: 'id = "businessDays"value = "10"',
                      content: '',
                      closed: true
                    },
                    nodes: [
                      {
                        object: 'text',
                        text: '10',
                        marks: [

                        ]
                      }
                    ]
                  },
                  {
                    object: 'text',
                    text: " Business Days' to inspect and evaluate the ",
                    marks: [

                    ]
                  },
                  {
                    object: 'inline',
                    type: 'variable',
                    data: {
                      tag: 'variable',
                      attributes: {
                        id: 'deliverable',
                        value: '%22Widgets%22'
                      },
                      attributeString: 'id = "deliverable"value = "%22Widgets%22"',
                      content: '',
                      closed: true
                    },
                    nodes: [
                      {
                        object: 'text',
                        text: '"Widgets"',
                        marks: [

                        ]
                      }
                    ]
                  },
                  {
                    object: 'text',
                    text: ' on the delivery date before notifying ',
                    marks: [

                    ]
                  },
                  {
                    object: 'inline',
                    type: 'variable',
                    data: {
                      tag: 'variable',
                      attributes: {
                        id: 'shipper',
                        value: '%22Party%20A%22'
                      },
                      attributeString: 'id = "shipper"value = "%22Party%20A%22"',
                      content: '',
                      closed: true
                    },
                    nodes: [
                      {
                        object: 'text',
                        text: '"Party A"',
                        marks: [

                        ]
                      }
                    ]
                  },
                  {
                    object: 'text',
                    text: ' that it is either accepting or rejecting the ',
                    marks: [

                    ]
                  },
                  {
                    object: 'inline',
                    type: 'variable',
                    data: {
                      tag: 'variable',
                      attributes: {
                        id: 'deliverable',
                        value: '%22Widgets%22'
                      },
                      attributeString: 'id = "deliverable"value = "%22Widgets%22"',
                      content: '',
                      closed: true
                    },
                    nodes: [
                      {
                        object: 'text',
                        text: '"Widgets"',
                        marks: [

                        ]
                      }
                    ]
                  },
                  {
                    object: 'text',
                    text: '.',
                    marks: [

                    ]
                  }
                ]
              },
              {
                object: 'block',
                type: 'paragraph',
                data: {

                },
                nodes: [
                  {
                    object: 'text',
                    text: 'Acceptance Criteria. The "Acceptance Criteria" are the specifications the ',
                    marks: [

                    ]
                  },
                  {
                    object: 'inline',
                    type: 'variable',
                    data: {
                      tag: 'variable',
                      attributes: {
                        id: 'deliverable',
                        value: '%22Widgets%22'
                      },
                      attributeString: 'id = "deliverable"value = "%22Widgets%22"',
                      content: '',
                      closed: true
                    },
                    nodes: [
                      {
                        object: 'text',
                        text: '"Widgets"',
                        marks: [

                        ]
                      }
                    ]
                  },
                  {
                    object: 'text',
                    text: ' must meet for the ',
                    marks: [

                    ]
                  },
                  {
                    object: 'inline',
                    type: 'variable',
                    data: {
                      tag: 'variable',
                      attributes: {
                        id: 'shipper',
                        value: '%22Party%20A%22'
                      },
                      attributeString: 'id = "shipper"value = "%22Party%20A%22"',
                      content: '',
                      closed: true
                    },
                    nodes: [
                      {
                        object: 'text',
                        text: '"Party A"',
                        marks: [

                        ]
                      }
                    ]
                  },
                  {
                    object: 'text',
                    text: ' to comply with its requirements and obligations under this agreement, detailed in ',
                    marks: [

                    ]
                  },
                  {
                    object: 'inline',
                    type: 'variable',
                    data: {
                      tag: 'variable',
                      attributes: {
                        id: 'attachment',
                        value: '%22Attachment%20X%22'
                      },
                      attributeString: 'id = "attachment"value = "%22Attachment%20X%22"',
                      content: '',
                      closed: true
                    },
                    nodes: [
                      {
                        object: 'text',
                        text: '"Attachment X"',
                        marks: [

                        ]
                      }
                    ]
                  },
                  {
                    object: 'text',
                    text: ', attached to this agreement.',
                    marks: [

                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};

test('can convert slate with variables', () => {
  const slateValue = Value.fromJSON(slateValueJSON);
  const value = toMarkdown.recursive(slateValue.document.nodes);
  expect(value).toMatchSnapshot();
});
