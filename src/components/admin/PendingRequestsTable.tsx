// components/admin/PendingRequestsTable.tsx
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface RoleRequest {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  requestedRole: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  requestedAt: string;
  processedAt: string | null;
  processedById: number | null;
  processedByName: string | null;
  message: string | null;
}

interface PendingRequestsTableProps {
  requests: RoleRequest[];
  onApprove: (requestId: number) => void;
  onReject: (requestId: number, message: string) => void;
}

const PendingRequestsTable = ({
  requests,
  onApprove,
  onReject,
}: PendingRequestsTableProps) => {
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(
    null
  );
  const [rejectMessage, setRejectMessage] = useState("");

  const handleRejectClick = (requestId: number) => {
    setSelectedRequestId(requestId);
    setRejectMessage("");
    setRejectDialogOpen(true);
  };

  const handleConfirmReject = () => {
    if (selectedRequestId !== null) {
      onReject(selectedRequestId, rejectMessage);
      setRejectDialogOpen(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>사용자</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead>요청 역할</TableHead>
            <TableHead>요청 시간</TableHead>
            <TableHead className="text-right">작업</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell className="font-medium">{request.userName}</TableCell>
              <TableCell>{request.userEmail}</TableCell>
              <TableCell>
                {request.requestedRole === "ROLE_ADMIN"
                  ? "관리자"
                  : request.requestedRole}
              </TableCell>
              <TableCell>{formatDate(request.requestedAt)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onApprove(request.id)}
                  >
                    승인
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRejectClick(request.id)}
                  >
                    거부
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>권한 요청 거부</DialogTitle>
            <DialogDescription>
              거부 사유를 입력하세요. 이 메시지는 사용자에게 전달됩니다.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="거부 사유를 입력하세요..."
              value={rejectMessage}
              onChange={(e) => setRejectMessage(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRejectDialogOpen(false)}
            >
              취소
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmReject}
              disabled={!rejectMessage.trim()}
            >
              거부 확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PendingRequestsTable;
