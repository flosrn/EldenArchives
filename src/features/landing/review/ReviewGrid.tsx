import type { ReviewItemProps } from "./ReviewItem";
import { ReviewItem } from "./ReviewItem";

export type ReviewGridProps = {
  reviews: ReviewItemProps[];
}

export const ReviewGrid = (props: ReviewGridProps) => {
  return (
    <div className="m-auto max-w-5xl columns-3 gap-4">
      {props.reviews.map((review) => (
        <ReviewItem
          {...review}
          key={review.image}
          className="mb-4 break-inside-avoid-column"
        />
      ))}
    </div>
  );
};
