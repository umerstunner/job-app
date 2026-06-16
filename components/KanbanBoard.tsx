'use client';

import { Board } from "@/lib/models/models.types";
import { Award, Calendar, CheckCircle2, Mic, MoreVertical, Trash2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import CreateJobApplicationDialog from "./create-job-dialog";
import board from "@/lib/models/board";

interface KanbanBoardProps {
    board: Board;
    userId: string;
}

interface ColumnConfig {
    color: string;
    icon: React.ReactNode;
}

const COLUMN_CONFIG: Array<ColumnConfig> = [
    {
    color: "bg-cyan-500",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    color: "bg-purple-500",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  {
    color: "bg-green-500",
    icon: <Mic className="h-4 w-4" />,
  },
  {
    color: "bg-yellow-500",
    icon: <Award className="h-4 w-4" />,
  },
  {
    color: "bg-red-500",
    icon: <XCircle className="h-4 w-4" />,
  },
];

function DroppableColumn({column, config, boardId}: {column: any, config: ColumnConfig, boardId: string}) {
    return <Card className="min-w-75 shrink-0 shadow-md p-0">
        <CardHeader className={`${config.color} text-white rounded-t-lg pb-3 pt-3`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {config.icon}
                    <CardTitle className="text-white text-base font-semibold">
                        {column.name}
                    </CardTitle>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger render={(props)=>(
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-white hover:bg-white/20">
                            <MoreVertical className="h-4 w-4"/>
                        </Button>
                    )} />
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4"/>
                                Delete Column
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </CardHeader>

        <CardContent>
            {/* Render tasks here */}
        <CreateJobApplicationDialog columnId={column._id} boardId={boardId} />
        </CardContent>

    </Card>
}
export default function KanbanBoard({ board, userId }: KanbanBoardProps) {
    const columns = board?.columns || [];
    return (
        <div className="kanban-board">
            <div>
                {columns.map((col, key) => {
                    const config = COLUMN_CONFIG[key] || { color: "bg-gray-500", icon: <Calendar className="h-4 w-4" /> };
                    return <DroppableColumn key={key} column={col} config={config} boardId={board._id} />;
                })}
            </div>
        </div>
    );
}