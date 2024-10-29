import { forgotPasswordAction } from "@/app/actions";
import { Link, routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";

import { FormMessage, Message } from "@/components/form-message";
import BreadcrumbContextSetter from "@/components/page-header/breadcrumb-context-setter";
import { BreadcrumbItemType } from "@/components/page-header/breadcrumb-navigator";
import { SubmitButton } from "@/components/submit-button";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export async function generateStaticParams() {
    const locales = routing.locales;
    return locales.map((locale) => ({ locale }));
}

export default function ForgotPassword({ searchParams }: { searchParams: Message }) {
    const t = useTranslations("authPages.forgotPassword");
    const tParent = useTranslations("authPages");

    const breadcrumbItems: BreadcrumbItemType[] = [
        { name: tParent("title"), isLast: false },
        { name: t("title"), isLast: true },
    ];

    return (
        <>
            <BreadcrumbContextSetter breadcrumbItems={breadcrumbItems} />
            <form className="flex flex-col mx-auto">
                <Card className="mx-auto w-96">
                    <CardHeader>
                        <CardTitle className="text-2xl">{t("title")}</CardTitle>
                        <CardDescription>{t("explanation")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">{t("email")}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder={t("emailPlaceholder")}
                                    required
                                />
                            </div>
                            <FormMessage message={searchParams} />
                            <SubmitButton
                                pendingText={t("pendingText")}
                                formAction={forgotPasswordAction}
                                className="w-full"
                            >
                                {t("submit")}
                            </SubmitButton>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            {t("haveAccount")}{" "}
                            <Link href="/sign-in" className="underline">
                                {t("haveAccountLink")}
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </>
    );
}
