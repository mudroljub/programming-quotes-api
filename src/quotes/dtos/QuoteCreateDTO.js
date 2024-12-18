export default class QuoteCreateDTO {
  constructor(data) {
    this.author = data.author
    this.text = data.text
    this.source = data.source
  }
}
