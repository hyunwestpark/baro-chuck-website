// NoticeManagement.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface Notice {
  id: number;
  title: string;
  content: string;
  appliedDate: string;
  createdAt: string;
  updatedAt: string;
}

const formSchema = z.object({
  title: z.string().min(2, {
    message: "제목은 최소 2글자 이상이어야 합니다.",
  }),
  content: z.string().min(5, {
    message: "내용은 최소 5글자 이상이어야 합니다.",
  }),
  appliedDate: z.date({
    required_error: "날짜를 선택해주세요.",
  }),
});

const Notice = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const api = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true,
  });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = () => {
    setLoading(true);
    api
      .get<Notice[]>("/notices")
      .then((response) => {
        setNotices(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("공지사항을 불러오는 중 오류가 발생했습니다:", error);
        setError("공지사항을 불러오는 중 오류가 발생했습니다.");
        setLoading(false);

        // 권한 오류면 대시보드로 이동
        if (axios.isAxiosError(error) && error.response?.status === 403) {
          navigate("/admin/dashboard");
        }
      });
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const noticeData = {
      title: values.title,
      content: values.content,
      appliedDate: format(values.appliedDate, "yyyy-MM-dd"),
    };

    api
      .post("/notices", noticeData)
      .then(() => {
        setIsCreateDialogOpen(false);
        form.reset();
        fetchNotices(); // 목록 새로고침
      })
      .catch((error) => {
        console.error("공지사항 생성 중 오류가 발생했습니다:", error);
        setError("공지사항 생성 중 오류가 발생했습니다.");
      });
  };

  const handleDeleteNotice = (noticeId: number) => {
    if (window.confirm("정말로 이 공지사항을 삭제하시겠습니까?")) {
      api
        .delete(`/notices/${noticeId}`)
        .then(() => {
          fetchNotices(); // 목록 새로고침
        })
        .catch((error) => {
          console.error("공지사항 삭제 중 오류가 발생했습니다:", error);
          setError("공지사항 삭제 중 오류가 발생했습니다.");
        });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "yyyy년 MM월 dd일", { locale: ko });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
      {/* 상단 내비게이션 - AdminDashboard와 동일한 스타일 */}
      <div className="bg-card text-card-foreground my-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">공지사항 관리</h1>
        <div className="flex gap-2">
          <Button
            onClick={() => navigate("/admin/dashboard")}
            variant="outline"
          >
            대시보드로 돌아가기
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(true)} variant="default">
            새 공지사항 작성
          </Button>
        </div>
      </div>

      {/* 공지사항 목록 - AdminDashboard 카드 스타일과 동일 */}
      <div className="bg-card text-card-foreground rounded-lg p-6 mb-6 border">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          병원 운영 공지사항
        </h2>

        {notices.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>제목</TableHead>
                <TableHead>적용 날짜</TableHead>
                <TableHead>작성일</TableHead>
                <TableHead className="text-right">작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notices.map((notice) => (
                <TableRow key={notice.id}>
                  <TableCell className="font-medium">{notice.title}</TableCell>
                  <TableCell>{formatDate(notice.appliedDate)}</TableCell>
                  <TableCell>{formatDate(notice.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteNotice(notice.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            등록된 공지사항이 없습니다.
          </div>
        )}
      </div>

      {/* 공지사항 작성 다이얼로그 */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>새 공지사항 작성</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>제목</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="예: 5월 1일 병원 휴무 안내"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>내용</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="예: 근로자의 날을 맞아 5월 1일은 휴무입니다. 응급 상황은 응급실로 연락 바랍니다."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="appliedDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>적용 날짜</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={`w-full pl-3 text-left font-normal ${
                              !field.value ? "text-muted-foreground" : ""
                            }`}
                          >
                            {field.value ? (
                              format(field.value, "yyyy년 MM월 dd일", {
                                locale: ko,
                              })
                            ) : (
                              <span>날짜 선택</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          locale={ko}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <div className="text-sm bg-red-50  text-red-700 px-4 py-3 rounded-lg border border-red-400 mb-4">
                  {error}
                </div>
              )}
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  취소
                </Button>
                <Button type="submit">저장</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Notice;
