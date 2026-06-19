import type { QueryObserverResult } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import type { AxiosError } from "axios";
import type React from "react";
import type { ApiResponse } from "types/api";
import { extract_message } from "@/helpers/apihelpers";
import { Loader2 } from "lucide-react";

interface QueryPageLayoutProps extends PropsWithChildren {
  query: QueryObserverResult;
  headerActions?: React.ReactNode | any;
}

export default function QueryPageLayout(props: QueryPageLayoutProps) {
  if (props.query.isLoading)
    return (
      <div className="min-h-[60vh] w-full flex flex-col items-center justify-center p-8">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-base-content/60 font-medium">Loading...</p>
      </div>
    );

  if (props.query.error) {
    const error = extract_message(props.query.error as AxiosError<ApiResponse>);
    return (
      <div className="p-4 h-[520px] grid place-items-center bg-base-300 rounded-md">
        <div className="p-4 space-y-4 ">
          <div className="text-lg text-center fieldset-label font-bold floating-label  wrap-anywhere">
            {error}
          </div>
          <button
            className="btn btn-error btn-block"
            onClick={() => props.query.refetch()}
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  if (props.query.isSuccess || props.query.data)
    return (
      <div className="mt-4 animate-in fade-in duration-500">
        {props.children}
      </div>
    );

  return null;
}
