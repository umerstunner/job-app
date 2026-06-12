"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "@/lib/auth/auth-client";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		setError("");
		setLoading(true);

		try {
			const result = await signIn.email({
				email,
				password,
			});

			if (result.error) {
				setError(result.error.message ?? "Failed to sign in");
			} else {
				router.push("/dashboard");
			}
		} catch (err) {
			setError("An unexpected error occurred");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4">
			<Card>
				<CardHeader>
					<CardTitle>Sign In</CardTitle>
					<CardDescription>
						Sign in to your account to access your job applications
					</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent>
						{error && (
							<div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
								{error}
							</div>
						)}
						<div>
							<Label htmlFor="email">Email </Label>
							<Input
								id="email"
								type="email"
								placeholder="john.doe@example.com"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<Label htmlFor="password">Password </Label>
							<Input
								id="password"
								type="password"
								placeholder="••••••••"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</CardContent>
					<CardFooter>
						<Button type="submit" disabled={loading}>
							{loading ? "Signing in..." : "Sign In"}
						</Button>
						<p>
							Don't have an account?{" "}
							<Link href="/sign-up" className="text-primary">
								Sign Up
							</Link>
						</p>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
