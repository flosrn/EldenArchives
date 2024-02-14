import { SiteConfig } from "@/site-config";
import { Link, Section, Text } from "@react-email/components";
import { EmailLayout } from "./utils/EmailLayout";

export default function DeleteAccountEmail({ email }: { email: string }) {
  return (
    <EmailLayout>
      <Section className="my-6">
        <Text className="text-lg leading-6">Hello,</Text>
        <Text className="text-lg leading-6">
          You account with email{" "}
          <Link
            className="text-sky-500 hover:underline"
            href={`mailto:${email}`}
          >
            {email}
          </Link>{" "}
          has been deleted.
        </Text>
        <Text className="text-lg leading-6">This action is irreversible.</Text>
        <Text className="text-lg leading-6">
          If you have any questions, please contact us at{" "}
          {SiteConfig.email.contact}.
        </Text>
      </Section>
      <Text className="text-lg leading-6">
        Best,
        <br />- {SiteConfig.maker.name} from {SiteConfig.title}
      </Text>
    </EmailLayout>
  );
}
