import Head from "next/head";
type Props = {
  title: string;
  children: React.ReactNode;
};
const Layout: React.FC<Props> = (props) => {
  return (
    <div className="layout-container">
      <Head>
        <title>{props.title}</title>
      </Head>
      {props.children}
      <style jsx>
        {`
          div{
            margin:0,
            padding:0
          }
        `}
      </style>
    </div>
  );
};
export default Layout;
