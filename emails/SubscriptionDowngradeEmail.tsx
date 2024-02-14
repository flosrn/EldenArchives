import { getServerUrl } from "@/lib/server-url";
import { SiteConfig } from "@/site-config";
import { Preview, Section, Text } from "@react-email/components";
import Link from "next/link";
import { EmailLayout } from "./utils/EmailLayout";

export default function SubscribtionDowngradeEmail() {
  return (
    <EmailLayout>
      <Preview>Your Premium Access Has Been Paused</Preview>
      <Section className="my-6">
        <Text className="text-lg leading-6">Hello,</Text>
        <Text className="text-lg leading-6">
          We're reaching out to inform you that your account has reverted to our
          basic access level. This change is due to the recent issues with your
          premium subscription payment.
        </Text>
        <Text className="text-lg leading-6">
          While you'll still enjoy our core services, access to premium features
          is now limited. We'd love to have you back in our premium community!
        </Text>
        <Text className="text-lg leading-6">
          To reactivate your premium status, simply update your payment
          information here:
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
          If you have any questions or need assistance, our team is always here
          to help.
        </Text>
      </Section>
      <Text className="text-lg leading-6">
        Best,
        <br />- {SiteConfig.maker.name} from {SiteConfig.title}
      </Text>
    </EmailLayout>
  );
}
