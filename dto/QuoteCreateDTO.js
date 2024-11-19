class QuoteCreateDTO {
  constructor(data) {
    this.author = data.author
    this.en = data.en
    this.sr = data.sr
    this.source = data.source
  }
}

export default QuoteCreateDTO
