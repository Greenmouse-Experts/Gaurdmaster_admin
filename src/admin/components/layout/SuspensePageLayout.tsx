import type { QueryObserverResult } from "@tanstack/react-query";
import type { JSX } from "react/jsx-runtime";
import { extract_message } from "@/helpers/apihelpers";
import type { AxiosError } from "axios";
import type { ApiResponse } from "types/api";
import type React from "react";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import SimpleTitle from "../SimpleTitle";

interface QueryPageLayoutProps<TData> {
  query: QueryObserverResult<TData>;
  title?: string | JSX.Element;
  headerActions?: React.ReactNode;
  children?: React.ReactNode | ((data: TData) => React.ReactNode);
  showTitle?: boolean;
}

export default function SuspensePageLayout<TData>(
  props: QueryPageLayoutProps<TData>,
) {
  const { showTitle = true } = props;
  useEffect(() => {
    console.log("useEffect called");
  }, [props.query.isError]);
  if (props.query.isLoading)
    return (
      <div className="flex flex-col gap-4">
        {showTitle && (
          <div className="flex justify-between items-center">
            {typeof props.title === "string" ? (
              <SimpleTitle title={props.title} />
            ) : (
              props.title
            )}
            {props.headerActions}
          </div>
        )}
        <div className="min-h-[60vh] w-full flex flex-col items-center justify-center p-8">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-base-content/60 font-medium">Loading...</p>
        </div>
      </div>
    );

  if (props.query.isError) {
    const error = extract_message(props.query.error as AxiosError<ApiResponse>);

    return (
      <div className="flex flex-col gap-4">
        {showTitle && (
          <div className="flex justify-between items-center">
            {typeof props.title === "string" ? (
              <SimpleTitle title={props.title} />
            ) : (
              props.title
            )}
            {props.headerActions}
          </div>
        )}
        <div className="p-4 min-h-[520px] grid place-items-center bg-base-300 rounded-md">
          <div className="p-4 space-y-4">
            <div className="text-lg text-center fieldset-label font-bold wrap-anywhere">
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
      </div>
    );
  }

  if (props.query.isSuccess && props.query.data)
    return (
      <div className="flex flex-col gap-4">
        {showTitle && (
          <div className="flex justify-between items-center">
            {typeof props.title === "string" ? (
              <SimpleTitle title={props.title} />
            ) : (
              props.title
            )}
            {props.headerActions}
          </div>
        )}
        <div className="mt-4 min-h-[520px] animate-in fade-in duration-500">
          {typeof props.children === "function"
            ? props.children(props.query.data)
            : props.children}
        </div>
      </div>
    );

  return null;
}
