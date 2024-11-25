type RatingProps = {
  rating: number
}

export default function Stars({ rating }: RatingProps): JSX.Element {
  const maxStars = 5
  const filledStars = '★'.repeat(rating)
  const emptyStars = '☆'.repeat(maxStars - rating)

  return (
    <div className="text-yellow-500 text-lg">
      {filledStars}{emptyStars}
    </div>
  )
}
