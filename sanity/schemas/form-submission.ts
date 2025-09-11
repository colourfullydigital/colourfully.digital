export default {
  name: 'formSubmission',
  title: 'Form Submission',
  type: 'document',
  fields: [
    { name: 'form', type: 'reference', to: [{ type: 'form' }], title: 'Form' },
    { name: 'submittedAt', type: 'datetime', title: 'Submitted At' },
    {
      name: 'payload',
      type: 'array',
      title: 'Payload',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'key', type: 'string', title: 'Field Key' },
            { name: 'value', type: 'string', title: 'Field Value' }
          ]
        }
      ]
    },
    { name: 'ipAddress', type: 'string', title: 'IP Address' },
  ],
}
