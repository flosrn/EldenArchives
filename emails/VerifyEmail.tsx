import { SiteConfig } from "@/site-config";
import { Link, Preview, Section, Text } from "@react-email/components";
import { EmailLayout } from "./utils/EmailLayout";

export default function VerifyEmail({ url }: { url: string }) {
  return (
    <EmailLayout>
      <Preview>Please click the link below to sign in to your account.</Preview>
      <Section className="my-6">
        <Text className="text-lg leading-6">
          You requested to verify your email address for your account at{" "}
          {SiteConfig.title}.
        </Text>
        <Text>If you didn't request this, please ignore this email.</Text>
        <Text className="text-lg leading-6">
          <Link className="text-sky-500 hover:underline" href={url}>
            👉 Click here to verify your email 👈
          </Link>
        </Text>
      </Section>
      <Text className="text-lg leading-6">
        Best,
        <br />- {SiteConfig.maker.name} from {SiteConfig.title}
      </Text>
    </EmailLayout>
  );
}
