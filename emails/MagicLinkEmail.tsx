import { SiteConfig } from "@/site-config";
import { Link, Preview, Section, Text } from "@react-email/components";
import { EmailLayout } from "./utils/EmailLayout";

export default function MagicLinkMail({ url }: { url: string }) {
  return (
    <EmailLayout>
      <Preview>
        You have requested a magic link to sign in to your account.
      </Preview>
      <Section className="my-6">
        <Text className="text-lg leading-6">
          <Link className="text-sky-500 hover:underline" href={url}>
            👉 Click here to sign in 👈
          </Link>
        </Text>
        <Text className="text-lg leading-6">
          If you didn't request this, please ignore this email.
        </Text>
      </Section>
      <Text className="text-lg leading-6">
        Best,
        <br />- {SiteConfig.maker.name} from {SiteConfig.title}
      </Text>
    </EmailLayout>
  );
}
