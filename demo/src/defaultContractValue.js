export default {
  object: 'value',
  document: {
    object: 'document',
    data: {},
    nodes: [
      {
        object: 'block',
        type: 'heading_one',
        data: {},
        nodes: [
          {
            object: 'text',
            text: 'Supply Agreement',
            marks: []
          }
        ]
      },
      {
        object: 'block',
        type: 'paragraph',
        data: {},
        nodes: [
          {
            object: 'text',
            text: 'This is a supply agreement between Party A and Party B.',
            marks: []
          }
        ]
      },
      {
        object: 'block',
        type: 'heading_one',
        data: {},
        nodes: [
          {
            object: 'text',
            text: 'Payment',
            marks: []
          }
        ]
      },
      {
        object: 'block',
        type: 'clause',
        data: {
          tag: 'clause',
          attributes: {
            src: 'https://templates.accordproject.org/archives/full-payment-upon-signature@0.7.1.cta'
          },
          attributeString: 'src = "https://templates.accordproject.org/archives/full-payment-upon-signature@0.7.1.cta"',
          content: '\n  Upon the signing of this Agreement, "Dan" shall pay the total purchase price to "Steve" in the amount of 0.01 USD.\n  ',
          closed: false
        },
        nodes: [
          {
            object: 'block',
            type: 'paragraph',
            data: {},
            nodes: [
              {
                object: 'text',
                text: '\n  Upon the signing of this Agreement, "Dan" shall pay the total purchase price to "Steve" in the amount of 0.01 USD.\n  ',
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: 'block',
        type: 'heading_two',
        data: {},
        nodes: [
          {
            object: 'text',
            text: 'Late Delivery And Penalty',
            marks: []
          }
        ]
      },
      {
        object: 'block',
        type: 'clause',
        data: {
          tag: 'clause',
          attributes: {
            src: 'https://templates.accordproject.org/archives/latedeliveryandpenalty@0.13.1.cta'
          },
          attributeString: 'src = "https://templates.accordproject.org/archives/latedeliveryandpenalty@0.13.1.cta"',
          content: '\n  Late Delivery and Penalty. In case of delayed delivery except for Force Majeure cases, "Dan" (the Seller) shall pay to "Steve" (the Buyer) for every 2 days of delay penalty amounting to 10.5% of the total value of the Equipment whose delivery has been delayed. Any fractional part of a days is to be considered a full days. The total amount of penalty shall not however, exceed 55% of the total value of the Equipment involved in late delivery. If the delay is more than 15 days, the Buyer is entitled to terminate this Contract.\n  ',
          closed: false
        },
        nodes: [
          {
            object: 'block',
            type: 'paragraph',
            data: {},
            nodes: [
              {
                object: 'text',
                text: '\n  Late Delivery and Penalty. In case of delayed delivery except for Force Majeure cases, "Dan" (the Seller) shall pay to "Steve" (the Buyer) for every 2 days of delay penalty amounting to 10.5% of the total value of the Equipment whose delivery has been delayed. Any fractional part of a days is to be considered a full days. The total amount of penalty shall not however, exceed 55% of the total value of the Equipment involved in late delivery. If the delay is more than 15 days, the Buyer is entitled to terminate this Contract.\n  ',
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: 'block',
        type: 'paragraph',
        data: {},
        nodes: [
          {
            object: 'text',
            text: 'End.',
            marks: []
          }
        ]
      }
    ]
  }
};
