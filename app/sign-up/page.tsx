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
import { signUp } from "@/lib/auth/auth-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const result = await signUp.email({ name, email, password });

			if (result.error) {
				setError(result.error.message ?? "Failed to sign-up");
			} else {
				router.push("/dashboard");
			}
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4">
			<Card>
				<CardHeader>
					<CardTitle>Sign Up</CardTitle>
					<CardDescription>
						Create an account to start tracking your job applications
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
							<Label htmlFor="name">Name </Label>
							<Input
								id="name"
								type="text"
								placeholder="John Doe"
								required
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
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
							{loading ? "Creating account..." : "Sign Up"}
						</Button>
						<p>
							Already have an account?{" "}
							<Link href="/sign-in" className="text-primary">
								Sign In
							</Link>
						</p>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
