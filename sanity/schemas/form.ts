const FORM_FIELD_TYPES = ['text', 'email', 'textarea', 'checkbox'];

export default {
  name: 'form',
  title: 'Form',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },
    { name: 'fields', type: 'array', of: [{
      type: 'object',
      title: 'Form Field',
      fields: [
        { name: 'label', type: 'string', title: 'Label' },
        { name: 'name', type: 'string', title: 'Field Name' },
        { name: 'type', type: 'string', title: 'Type', options: { list: FORM_FIELD_TYPES } },
        { name: 'required', type: 'boolean', title: 'Required' },
      ]
    }] },
    { name: 'submitText', type: 'string', title: 'Submit Button Text' },
  ],
}
