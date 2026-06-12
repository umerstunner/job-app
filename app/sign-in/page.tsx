"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";


export default function SignIn(){
    return (
        <div className="flex min-g-[calc(100vh-4rem)] items-center justify-center bg-white p-4">
            <Card>
                <CardHeader>
                    <CardTitle>
                        Sign In
                    </CardTitle>
                    <CardDescription>
                        Sign in to your account to access your job applications
                    </CardDescription>
                </CardHeader>
                <form>
                    <CardContent>
                        
                        <div>
                            <Label htmlFor="email">Email </Label>
                            <Input id="email" type="email" placeholder="john.doe@example.com" required />
                        </div>
                        <div>
                            <Label htmlFor="password">Password </Label>
                            <Input id="password" type="password" placeholder="••••••••" required />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit">
                            Sign In
                        </Button>
                        <p>
                            Don't have an account? <Link href="/sign-up" className="text-primary">Sign Up</Link>
                        </p>
                    </CardFooter>
                </form>
            
            </Card>
        </div>
    );
}