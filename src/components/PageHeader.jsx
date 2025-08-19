export default function PageHeader() {
  return (
    <div className="container header-container">
      <header className="app-header">
        <div>
          <h1 className="title">Context-Free Grammar Simulator</h1>
          <p className="text--lg">
            Define grammars, parse words with CYK algorithm, and visualize parse
            trees
          </p>
        </div>
      </header>
    </div>
  );
}
