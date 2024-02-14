import { getServerUrl } from "@/lib/server-url";
import { SiteConfig } from "@/site-config";
import { Preview, Section, Text } from "@react-email/components";
import Link from "next/link";
import { EmailLayout } from "./utils/EmailLayout";

export default function SubscribtionFailedEmail() {
  return (
    <EmailLayout>
      <Preview>
        Important information about your ${SiteConfig.title} account
      </Preview>
      <Section className="my-6">
        <Text className="text-lg leading-6">Hello,</Text>
        <Text className="text-lg leading-6">
          Your last payment didn't go through, so your extra features are on
          hold.
        </Text>
        <Text className="text-lg leading-6">
          We've noticed an issue with your recent payment, which affects your
          access to our premium features.
        </Text>
        <Text className="text-lg leading-6">
          To resolve this and continue enjoying all the benefits, simply update
          your payment details through the link below. It's quick and
          straightforward!
        </Text>
        <Text className="text-lg leading-6">
          <Link
            className="text-sky-500 hover:underline"
            href={`${getServerUrl()}/account/billing`}
          >
            Click to Update Payment and Keep Using ${SiteConfig.title}
          </Link>
        </Text>
        <Text className="text-lg leading-6">
          Thank you for your prompt attention to this matter. We're here to help
          if you have any questions.
        </Text>
      </Section>
      <Text className="text-lg leading-6">
        Best,
        <br />- {SiteConfig.maker.name} from {SiteConfig.title}
      </Text>
    </EmailLayout>
  );
}
