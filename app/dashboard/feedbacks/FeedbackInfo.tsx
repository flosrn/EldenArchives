import { Card } from "@/components/ui/card";

import type { FeedbackWithUser } from "./page";

export type FeedbackInfoProps = {
  data: FeedbackWithUser[];
};

export const FeedbackInfo = ({ data }: FeedbackInfoProps) => {
  const positiveFeedbacks = data.filter((feedback) => feedback.review === 4);
  const neutralFeedbacks = data.filter((feedback) => feedback.review === 3);
  const negativeFeedbacks = data.filter((feedback) => feedback.review === 2);
  const veryNegativeFeedbacks = data.filter(
    (feedback) => feedback.review === 1
  );
  return (
    <Card variant="background" className="mb-5 p-6">
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-bold">Feedbacks</h2>
          <p className="text-sm text-gray-500">
            Total feedbacks: {data.length}
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-500">Positive</p>
            <p className="text-2xl font-bold text-green-500">
              {positiveFeedbacks.length}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-500">Neutral</p>
            <p className="text-2xl font-bold text-yellow-500">
              {neutralFeedbacks.length}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-500">Negative</p>
            <p className="text-2xl font-bold text-red-500">
              {negativeFeedbacks.length}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-500">Very Negative</p>
            <p className="text-2xl font-bold text-red-500">
              {veryNegativeFeedbacks.length}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
