import type { QueryObserverResult } from "@tanstack/react-query";
import type { JSX } from "react/jsx-runtime";
import { extract_message } from "@/helpers/apihelpers";
import type { AxiosError } from "axios";
import type { ApiResponse } from "types/api";
import type React from "react";
import { Loader2 } from "lucide-react";
import SimpleTitle from "../SimpleTitle";

interface QueryPageLayoutProps {
  query: QueryObserverResult;
  title?: string | JSX.Element;
  headerActions?: React.ReactNode | any;
  children?: React.ReactNode | ((data: any) => React.ReactNode);
  showTitle?: boolean;
  minHeight?: string;
  fillHeight?: boolean;
}

export default function SuspenseCompLayout(props: QueryPageLayoutProps) {
  const { showTitle = false } = props;
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
        <div className="flex justify-center p-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );

  if (props.query.error) {
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
        <div className="p-4  grid place-items-center bg-base-300 rounded-md">
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
      </div>
    );
  }

  if (props.query.isSuccess || props.query.data)
    return (
      <div className="flex flex-col gap-4 h-full">
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
        <div className={`mt-4 ${props.fillHeight ? "h-full flex-1" : ""}`}>
          {props.children && typeof props.children === "function"
            ? props.children(props.query.data)
            : props.children}
        </div>
      </div>
    );

  return null;
}
