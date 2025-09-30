'use client';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/logo"
import { useFormState, useFormStatus } from "react-dom"
import { signupUser } from "@/lib/actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, XCircle, CheckCircle } from "lucide-react"

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full glow-sm" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : 'Create Account'}
    </Button>
  );
}

export default function SignupPage() {
  const [state, formAction] = useFormState(signupUser, {});

  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4">
      <Card className="mx-auto max-w-sm w-full bg-card/80 backdrop-blur-sm border-border/60">
        <CardHeader className="text-center">
          <Logo className="h-10 w-10 mx-auto text-primary glow-md mb-4" />
          <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
          <CardDescription>
            Join the Secure Sense community. Get started for free.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" placeholder="Alex Sentinel" required className="bg-background"/>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="sentinel@securesense.com"
                required
                className="bg-background"
              />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required className="bg-background"/>
            </div>

            {state.error && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Signup Failed</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}
            {state.success && (
              <Alert variant="default" className="border-green-500/50 text-green-500">
                <CheckCircle className="h-4 w-4 !text-green-500" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{state.success}</AlertDescription>
              </Alert>
            )}

            <SubmitButton />
            <Button variant="outline" className="w-full">
              Sign up with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline text-primary">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
