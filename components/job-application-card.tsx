import { Column, JobApplication } from "@/lib/models/models.types";
import { Card, CardContent } from "./ui/card";
import { Edit2, ExternalLink, MoreVertical, Trash2 } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { updateJobApplication } from "@/lib/actions/job-applications";

interface JobApplicationCardProps {
	job: JobApplication;
	columns: Column[];
}

export default function JobApplicationCard({
	job,
	columns,
}: JobApplicationCardProps) {
	async function handleMove(newColumnId: string) {
		try {
			const result = await updateJobApplication(job._id, {
				columnId: newColumnId,
			});
		} catch (err) {
			console.error("Failed to move job application", err);
		}
	}
	return (
		<>
			<Card className="mb-2 cursor-pointer">
				<CardContent>
					<div>
						<div>
							<h3 className="text-sm font-semibold">{job.position}</h3>
							<p className="text-xs text-muted-foreground">{job.company}</p>
							{job.description && (
								<p className="text-xs mt-1">{job.description}</p>
							)}
							{job.tags && job.tags.length > 0 && (
								<div className="flex flex-wrap gap-1 mt-2">
									{job.tags.map((tag, key) => (
										<span
											key={key}
											className="text-xs bg-gray-200 rounded-full px-2 py-1"
										>
											{tag}
										</span>
									))}
								</div>
							)}

							{job.jobUrl && (
								<a
									href={job.jobUrl}
									target="_blank"
									className="inline-flex items-center gap-1 mt-2 text-blue-500"
									onClick={(e) => e.stopPropagation()}
								>
									<ExternalLink className="h-4 w-4 mt-2 text-blue-500" />
								</a>
							)}
						</div>
						<div>
							<DropdownMenu>
								<DropdownMenuTrigger
									render={(props) => (
										<Button
											{...props}
											variant="ghost"
											size="icon"
											className="h-6 w-6 text-muted-foreground hover:bg-gray-200"
											onClick={(e) => {
												e.stopPropagation();
												props.onClick?.(e);
											}}
										>
											<MoreVertical className="h-4 w-4" />
										</Button>
									)}
								/>
								<DropdownMenuContent align="end">
									<DropdownMenuItem
										onSelect={() => window.open(job.jobUrl, "_blank")}
										className="text-blue-500"
									>
										<Edit2 />
									</DropdownMenuItem>
									{columns.length > 1 && (
										<>
											{columns
												.filter((c) => c._id !== job.columnId)
												.map((column, key) => (
													<DropdownMenuItem
														key={key}
														onClick={() => handleMove(column._id)}
													>
														Move to {column.name}
													</DropdownMenuItem>
												))}
										</>
									)}
									<DropdownMenuItem>
										<Trash2 />
										Delete
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</CardContent>
			</Card>
		</>
	);
}
