import { SiteConfig } from "@/site-config";
import { Preview, Section, Text } from "@react-email/components";
import { EmailLayout } from "./utils/EmailLayout";

export default function SuccessUpgradeEmail() {
  return (
    <EmailLayout>
      <Preview>
        You have successfully upgraded your account to ${SiteConfig.title}
      </Preview>
      <Section className="my-6">
        <Text className="text-lg leading-6">Hello,</Text>
        <Text className="text-lg leading-6">
          Great news! Your payment was successful, and you now have full access
          to all our premium features. Get ready to explore everything we have
          to offer!
        </Text>
        <Text className="text-lg leading-6">
          If you have any questions or need assistance as you dive in, feel free
          to reach out to us. We're here to help you make the most of your
          experience.
        </Text>
        <Text className="text-lg leading-6">Happy exploring,</Text>
      </Section>
      <Text className="text-lg leading-6">
        Best,
        <br />- {SiteConfig.maker.name} from {SiteConfig.title}
      </Text>
    </EmailLayout>
  );
}
