export default {
  name: 'formSubmission',
  title: 'Form Submission',
  type: 'document',
  fields: [
    { name: 'form', type: 'reference', to: [{ type: 'form' }], title: 'Form' },
    { name: 'submittedAt', type: 'datetime', title: 'Submitted At' },
    { name: 'payload', type: 'object', title: 'Payload', fields: [
      { name: 'name', type: 'string', title: 'Name' },
      { name: 'email', type: 'string', title: 'Email' },
      { name: 'message', type: 'text', title: 'Message' },
    ] },
    { name: 'ipAddress', type: 'string', title: 'IP Address' },
  ],
}
